import { xContact } from "./contact";
import { xLocation } from "./location";
import { xMedia } from "./media";
import { xReaction } from "./reaction";
import { xText } from "./text";

export interface xMessage {
    messaging_product: 'messaging_product',
    recipient_type: 'individual',
    to: string;
    type: 'text' | 'reaction' | 'image' | 'audio' | 'document' | 'sticker' | 'video' | 'location' | 'contacts' | 'interactive',
    image?: xMedia;
    audio?: xMedia;
    document?: xMedia;
    sticker?: xMedia;
    video?: xMedia;
    text: xText,
    reaction?: xReaction,
    location?: xLocation,
    contacts?: xContact,
    interactive: string
}