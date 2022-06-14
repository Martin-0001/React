import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

// Todo List

test("Disable add button if the input is empty", () => {
  render(<App />);
  const todoAddButton = screen.getByText(/Add/i);
  expect(todoAddButton).toBeDisabled();
});

// Login

test("Username should be empty", () => {
  render(<App />);
  const usernameInput =
    screen.getByPlaceholderText<HTMLInputElement>(/Username/i);
  expect(usernameInput.value).toBe("");
});

test("Password should be empty", () => {
  render(<App />);
  const passwordInput =
    screen.getByPlaceholderText<HTMLInputElement>(/Password/i);
  expect(passwordInput.value).toBe("");
  console.log(passwordInput.value);
});

test("Disable submit button", () => {
  render(<App />);
  const LoginButton = screen.getByTestId("login-button");
  expect(LoginButton).toBeDisabled();
});

test("Login button should not be disabled when inputs exist", () => {
  render(<App />);
  const LoginButton = screen.getByTestId("login-button");
  const usernameInput = screen.getByPlaceholderText(/Username/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);

  const testValue = "test";

  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });

  expect(LoginButton).not.toBeDisabled();
});
