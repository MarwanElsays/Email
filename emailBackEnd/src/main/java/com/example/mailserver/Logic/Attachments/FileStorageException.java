package com.example.mailserver.Logic.Attachments;

public class FileStorageException extends RuntimeException {

    private static final long serialVersionUID = 6062226113931161531L;

    public FileStorageException(String message) {
        super(message);
    }

    public FileStorageException(String message, Throwable cause) {
        super(message, cause);
    }
}