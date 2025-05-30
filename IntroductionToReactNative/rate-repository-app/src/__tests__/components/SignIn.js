import {
    render,
    screen,
    fireEvent,
    waitFor,
} from "@testing-library/react-native";
import { SignInForm } from "../../components/SignIn";

describe("SignIn", () => {
    describe("SignInContainer", () => {
        it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
            // render the SignInContainer component, fill the text inputs and press the submit button <- Funnily enough, I had to refactor more for the RepoList & RepoItem than for SignIn which I didnt have to refactor at all... Thankfully there was example code for RepoList etc, made the refactor a lot easier honestly..
            const onSubmit = jest.fn();

            render(<SignInForm onSubmit={onSubmit} />);

            fireEvent.changeText(screen.getByPlaceholderText("Username"), "kalle");
            fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");
            fireEvent.press(screen.getByText("Sign in"));

            await waitFor(() => {
                // expect the onSubmit function to have been called once and with a correct first argument
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    user: "kalle",
                    pw: "password",
                });
            });
        });
    });
});
