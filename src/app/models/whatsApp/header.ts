import { xMedia } from "./media";
import { xText } from "./text";

export interface xHeader {
    document: xMedia;
    image: xMedia;
    video: xMedia;
    text: xText;
    type: 'text' | 'video' | 'image' | 'document'
}