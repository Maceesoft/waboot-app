import { HttpClient } from "@microsoft/signalr";

export type ImageType = 'image/jpeg' | 'image/png';
export type DocumentType = 'text/plain' | 'application/pdf' | 'application/vnd.ms-powerpoint' | 'application/msword' | 'application/vnd.ms-excel' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' | 'application/vnd.openxmlformats-officedocument.presentationml.presentation' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
export type AudioType = 'audio/aac' | 'audio/mp4' | 'audio/mpeg' | 'audio/amr' | 'audio/ogg' | 'audio/opus';
export type VideoType = 'video/mp4' | 'video/3gp';
export type StickerType = 'image/webp';


export const wApi = {
    numberPhone: '',
    uploadMedia: (http: HttpClient, opt: { file: string, type: ImageType | DocumentType | AudioType | VideoType | StickerType }) => {
       
    }
}