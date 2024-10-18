import {
    getFirestore,
    query,
    collection,
    onSnapshot,
    addDoc,
    Timestamp,
} from "firebase/firestore";
import { app } from "../../firebase/firebaseconfig";
import { Channel, ChannelRef } from "../../types/Channel";
import { channel } from "diagnostics_channel";

const db = getFirestore(app);

export const subscribeChannels = (
    onChannelsUpdated: (channels: ChannelRef[]) => void
) => {
    const q = query(collection(db, "channels"));

    return onSnapshot(
        q,
        (querySnapshot) => {
            const channelRefs: ChannelRef[] = [];
            querySnapshot.forEach((doc) => {
                channelRefs.push({
                    id: doc.id,
                    channel: doc.data() as Channel,
                });
            });
            onChannelsUpdated(channelRefs);
        },
        (error) => {
            console.error("Failed to subscribe channels:", error);
        }
    );
};

export const postChannel = async(channel:Channel)=>{
    await addDoc(collection(db,"channels"), channel)
}

export const createChannel = (name: string): Channel => {
    const timestamp = Timestamp.fromDate(new Date());
    return {
        name: name,
        create_at: timestamp,
    }
}