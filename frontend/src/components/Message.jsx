import '../styles/message.css'

const Message = ({data}) => {
    if (data.show) {
        return <>
            <p className={data.error ? 'error' : 'message'}>{data.message}</p>
         </>
    }
}

export default Message;