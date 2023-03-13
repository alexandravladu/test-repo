import styled from 'styled-components';
import {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'


function Search() {

//In order to get the value of the input, we will use state, in this case it will be a string for whatever the user types in 
// To navigate while being redirected to the Searched page based on input typed, we have to use the useNavigate hook. This will update the URL after the /searched/, with whatever you looked for

const [input, setInput] = useState("") 
const navigate = useNavigate()


//normal behaviour of a form is to refresh the page when you submit something, we want to prevent the page from refreshing and only the pages to be switched over

const submitHandler = (e) => {
    e.preventDefault();
    navigate('/searched/' + input)
}
  return (
   <FormStyle onSubmit={submitHandler}>
        <div>
        <FaSearch> </FaSearch>
        <input 
            onChange={(e) => setInput(e.target.value)} 
            type="text" 
            value={input} />
        </div>
   </FormStyle>
  )
}

const FormStyle = styled.form`
    margin: 0rem 10rem;
 
    div{
        position: relative;
        width: 100%;
   }

    input{
        border:none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color:white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%;
    }
    svg{
        position:absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
    }
`

export default Search;
