import { useSignMessage, useAccount } from 'wagmi'
import { verifyMessage } from 'ethers/lib/utils'
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export function SignMessage() {
    //textfield data
    const [message, setMessage] = useState()
    //the messages that is signed
    const [signedMessage, setSignedMessage] = useState()

    //check if user is loggedin
    const { data, isError, isLoading } = useAccount()

    //address and signed message
    const recoveredAddress = React.useRef()

    //siging the message
    const { signature, error, isLoadingAccountData, signMessage } = useSignMessage({
        onSuccess(signature, variables) {
            // Verify signature when sign message succeeds
            const address = verifyMessage(variables.message, signature)
            recoveredAddress.current = address
            recoveredAddress.signature = signature
            setSignedMessage(message);
        }, onError(error) {
            console.log(error);
        }
    })

    return (
        <Form
            onSubmit={(event) => {
                event.preventDefault()
                const formData = new FormData(event.target)
                const message = formData.get('message')
                signMessage({ message })
            }}
            className="m-4"
        >
            <h4 className="mt-4 text-center" >Sign Message</h4>
            <b
                className="mt-4"
                htmlFor="message">Enter a message to sign</b>
            <Form.Control
                id="message"
                name="message"
                style={{ height: 70 }}
                placeholder="The quick brown fox…"
                onChange={(event) => setMessage(event.target.value)}
            />
            {data ?
                <Button type="submit" variant="success" className="form-control mt-2 bold" disabled={isLoading}>
                    {isLoading ? 'Check Wallet' : 'Sign Message'}
                </Button>
                :
                <Button variant="warning" unselectable='true' className="form-control mt-2 bold" disabled="true">
                    Please log in
                </Button>
            }

            {recoveredAddress.signature && (
                <div className='mt-5'>
                    <div><b>Message:</b> {signedMessage}</div>
                    <div><b>Signature:</b> {recoveredAddress.signature}</div>
                    <div><b>Signed with:</b> {recoveredAddress.current}</div>
                </div>
            )}

            {error && <div>{error.message}</div>}
        </Form>
    )
}

export default SignMessage