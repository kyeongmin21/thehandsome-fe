interface ErrorMessageProps {
    message?: string;
}

const ErrorMessage = ({message}: ErrorMessageProps) => {
    if (!message) return null;

    return (
        <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>
            {message}
        </div>
    );
};

export default ErrorMessage;