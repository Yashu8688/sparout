import { useState, useEffect } from 'react'
import './App.css'
import SplashScreen from './components/SplashScreen/SplashScreen'
import RoleSelection from './pages/RoleSelection/RoleSelection'
import StudentLogin from './pages/Student/StudentLogin'
import StudentRegister from './pages/Student/StudentRegister'
import StudentOnboarding from './pages/Student/StudentOnboarding'
import MasterLogin from './pages/Master/MasterLogin'
import MasterRegister from './pages/Master/MasterRegister'
import HomePage from './pages/HomePage/HomePage'
import StudentHome from './pages/Student/StudentHome'
import MasterHome from './pages/Master/MasterHome'
import MasterOnboarding from './pages/Master/MasterOnboarding'

// Firebase Imports
import { auth, db } from './firebase'
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut 
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

function App() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null); // 'student' or 'master'
  const [user, setUser] = useState(null); // Authenticated user
  const [isRegistering, setIsRegistering] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [showHome, setShowHome] = useState(false);

  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    // Listen for Auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is signed in, fetch role from Firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role);
            setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...userData });
            
            // Check if onboarding is needed
            if (!userData.onboardingCompleted) {
              setIsOnboarding(true);
            } else {
              setShowHome(true);
            }
          } else {
            // Handle case where auth user exists but Firestore record is missing
            console.warn("User authenticated but no Firestore record found.");
            await signOut(auth);
            setUser(null);
          }
        } else {
          // User is signed out
          setUser(null);
          const savedRole = localStorage.getItem('sparout_role');
          if (savedRole) setRole(savedRole);
        }
      } catch (error) {
        console.error("Critical Auth Listener Error:", error);
        // If there's a 400 error or token issue, clear the session
        await signOut(auth).catch(() => {});
        setUser(null);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSplashFinish = () => {
    setSplashFinished(true);
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem('sparout_role', selectedRole);
  };

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Verify role
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role !== role) {
          await signOut(auth);
          alert(`This account is registered as a ${userData.role}. Please use the correct login portal.`);
          return;
        }
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...userData });
        if (!userData.onboardingCompleted) {
          setIsOnboarding(true);
        } else {
          setShowHome(true);
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        alert("Invalid email or password. Please check your credentials.");
      } else {
        alert(error.message);
      }
    }
  };

  const handleRegister = async (data) => {
    try {
      // 1. Create Auth Account
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const firebaseUser = userCredential.user;

      // 2. Save Role & Basic Info to Firestore
      const userData = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || '',
        role: role,
        createdAt: new Date().toISOString(),
        onboardingCompleted: false
      };

      await setDoc(doc(db, "users", firebaseUser.uid), userData);
      
      setUser({ uid: firebaseUser.uid, ...userData });
      setIsRegistering(false);
      
      if (role === 'student') {
        setIsOnboarding(true);
      } else {
        setIsOnboarding(true);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      if (error.code === 'auth/email-already-in-use') {
        alert("This email is already registered. Please go back and try Logging In instead.");
      } else if (error.code === 'auth/weak-password') {
        alert("Password is too weak. Please use at least 6 characters.");
      } else {
        alert(error.message);
      }
    }
  };

  const handleOnboardingFinish = async (details) => {
    try {
      setLoading(true);
      // 1. Update the primary User document
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        ...details,
        onboardingCompleted: true
      }, { merge: true });

      // 2. If the user is a Master, also save to a global 'masters' collection for discovery
      if (role === 'master') {
        const masterRef = doc(db, "masters", user.uid);
        await setDoc(masterRef, {
          uid: user.uid,
          name: user.fullName,
          email: user.email,
          specialty: details.teachingArts?.[0] || 'Martial Arts',
          experience: `${details.yearsExperience} Years`,
          rating: 5.0, // Default rating for new masters
          students: details.studentCount || 0,
          description: details.bio,
          price: `₹${details.pricing}/mo`,
          image: user.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
          teachingArts: details.teachingArts || [],
          location: details.location || '',
          updatedAt: new Date().toISOString()
        });
      }

      console.log("Database Sync Successful: Profile & Discovery records updated.");
      setIsOnboarding(false);
      setShowHome(true);
    } catch (error) {
      console.error("Critical Database Error:", error);
      alert("Database Sync Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToRole = () => {
    if (user) {
      signOut(auth);
    }
    setRole(null);
    setUser(null);
    localStorage.removeItem('sparout_role');
    setIsRegistering(false);
    setIsOnboarding(false);
    setShowHome(false);
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  const handleLogout = () => {
    signOut(auth);
    handleBackToRole();
  };

  return (
    <div className="app-container">
      {loading || !splashFinished ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : !role ? (
        <RoleSelection onSelect={handleRoleSelect} />
      ) : isOnboarding ? (
        role === 'student' ? (
          <StudentOnboarding user={user} onFinish={handleOnboardingFinish} onBack={handleLogout} />
        ) : (
          <MasterOnboarding user={user} onFinish={handleOnboardingFinish} onBack={handleLogout} />
        )
      ) : !user ? (
        role === 'student' ? (
          isRegistering ? (
            <StudentRegister onBack={toggleRegister} onRegister={handleRegister} />
          ) : (
            <StudentLogin onLogin={handleLogin} onBack={handleBackToRole} onToggleRegister={toggleRegister} />
          )
        ) : (
          isRegistering ? (
            <MasterRegister onBack={toggleRegister} onRegister={handleRegister} />
          ) : (
            <MasterLogin onLogin={handleLogin} onBack={handleBackToRole} onToggleRegister={toggleRegister} />
          )
        )
      ) : (
        role === 'student' ? (
          <StudentHome user={user} onLogout={handleLogout} />
        ) : (
          <MasterHome user={user} onLogout={handleLogout} />
        )
      )}
    </div>
  )
}

export default App;



