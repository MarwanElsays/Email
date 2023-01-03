package com.example.mailserver.Logic.Attachments;

public class UploadFileResponse {
    private String fileName;
    private String downloadURL;
    private String fileType;
    private long size;

    public UploadFileResponse(String fileName, String downloadURL, String fileType, long size) {
        this.fileName = fileName;
        this.downloadURL = downloadURL;
        this.fileType = fileType;
        this.size = size;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getdownloadURL() {
        return downloadURL;
    }

    public void setdownloadURL(String downloadURL) {
        this.downloadURL = downloadURL;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }
}