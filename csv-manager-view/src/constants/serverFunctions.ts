import axios from "axios";
import { UploadCSVResponse } from "../@types";
import { serverURI } from "./serverURI";

export const uploadCSVToServer = async (editedData: any): Promise<UploadCSVResponse> => {
    try {
        const response = await axios.post(serverURI.uploadCSV, { data: editedData });
        return {
            data: response.data,
            status: true,
            message: 'File uploaded successfully'
        };
    } catch (error) {
        console.error('There was an error uploading the file!', error);
        return {
            data: null,
            status: false,
            message: 'Failed to upload file'
        };
    }
};
