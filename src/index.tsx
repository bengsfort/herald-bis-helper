import * as React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Header = styled.h1`
  font-size: 112px;
  font-weight: bold;
  font-color: #383838;
`;

function Page() {
  return (
    <div>
      <Header>Hello.</Header>
    </div>
  );
}

ReactDOM.render(<Page />, document.querySelector("#root"));
