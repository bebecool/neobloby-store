"use server"

import { signout as signoutCustomer, login as loginCustomer, signup as signupCustomer } from "./customer"

export async function signoutAction(countryCode: string) {
  return await signoutCustomer(countryCode)
}

export async function loginAction(currentState: unknown, formData: FormData) {
  return await loginCustomer(currentState, formData)
}

export async function signupAction(currentState: unknown, formData: FormData) {
  return await signupCustomer(currentState, formData)
}
