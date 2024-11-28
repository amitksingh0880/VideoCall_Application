import ListOfOnlineUsers from "@/components/ListOfOnlineUsers/listofonlineuser";
import CallNotification from "@/components/Notification/CallNotification";



export default function Home() {
  return (
     <div>
          <ListOfOnlineUsers/>
          <CallNotification/>
     </div>
  );
}
