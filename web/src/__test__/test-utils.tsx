
// test-utils.tsx
import { render } from "@testing-library/react";
import { AuthProvider } from '../hook/UseAuth';
import { ReactNode} from 'react'


const renderWithAuthProvider = (ui: ReactNode, options?: any) =>
  render(<AuthProvider>{ui}</AuthProvider>, options);

export * from "@testing-library/react";
export { renderWithAuthProvider as render };