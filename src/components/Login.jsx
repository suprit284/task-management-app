import Authform from './Authform';

const Login = () => {
  return (
    <div className='bg-blue-950 w-full h-[100vh] flex flex-col justify-center items-center'>
      <Authform 
        headerText="Login" 
        userAction="Login" 
        action="login"
      />
    </div>
  )
}

export default Login;