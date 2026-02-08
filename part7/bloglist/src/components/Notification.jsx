import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification || !notification.message) {
    return null
  }

  return <div className={notification.type}>{notification.message}</div>
}

export default Notification
