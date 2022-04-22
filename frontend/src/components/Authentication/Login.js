import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Login = () => {
  const toast = useToast();
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState();

  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const handleClick = () => setShow(!show);
  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email && !password) {
      toast({
        title: "Email or passowrd is missing",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "buttom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const user = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        config
      );
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "buttom",
      });
      localStorage.setItem("LoginUser", JSON.stringify(user));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",

        status: "error",
        duration: 5000,
        isClosable: true,
        position: "buttom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme={"red"}
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get guest user credentials
      </Button>
    </VStack>
  );
};

export default Login;
