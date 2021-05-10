import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const AuthForm = (props) => {
  return (
    <div className='login'>
      <form className='form' id='login' onSubmit={(e) => props.handleSubmit(e)}>
        <span>Username: </span>
        <TextField
          variant='outlined'
          id='username'
          onChange={props.handleUser}
          type='text'
        />
        <br />
        <br />
        <span>Password: </span>
        <TextField
          variant='outlined'
          id='password'
          onChange={props.handlePassword}
          type='password'
        />
        <br />
        <br />

        <Button type='Submit' variant='outlined' form='login' color='primary'>
          {props.buttonText}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
