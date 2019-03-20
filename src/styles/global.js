import { createGlobalStyle } from 'styled-components';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #23202C;
    color: #fff;
    font-family: 'Source Sans Pro', sans-serif;
    text-rendering: optimizelegibility !important;
    -webkit-font-smoothing: antialiased !important;

    @keyframes rodaroda {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  }

  html, body, #root {
    height: 100%;
  }
  div.react-datepicker-wrapper{
    display: flex;
    flex-direction: row;
    div.react-datepicker__input-container {
      flex:1;
    }
  }



  input, button {
    font-family: 'Source Sans Pro', sans-serif;
  }

  button{
    cursor: pointer;
  }
  .rrt-message{ color: red;}

`;
