
export default function Login() {

  const googleLogin = () => {
    window.location.href = 'https://learnos-backend-7453408282.us-central1.run.app/oauth2/authorization/google';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white">Welcome to LearnOS</h1>
      </div>
      <button className="bg-white py-2 px-4 rounded text-lg font-semibold mb-8" onClick={googleLogin}>
        Login with Google 
      </button>
      <div className="absolute bottom-4 text-center">
        <p className="text-white text-sm">Credits: Aiden Gaul, Caleb Navarro, and Timothy Okolowicz</p>
      </div>
    </div>
  );
}