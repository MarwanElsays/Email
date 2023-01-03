package com.example.mailserver.Logic.Attachments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    private Path fileStorageLocation;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception e) {
            throw new FileStorageException("Could not create the directory", e);
        }
    }

    public String storeFile(MultipartFile file, String sender, String[] receivers, String id) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        
        //create folder sender and receivers and create the files inside
        Path pathSender = Paths.get(this.fileStorageLocation + "/" + sender + "/Attachments/" + id);

        // if directory is not present then it will be created
        try {
            Files.createDirectories(pathSender);
        } catch (Exception e) {
            throw new FileStorageException("Could not create the directory", e);
        }
        // add file to directory
        try {
            pathSender = Paths.get(pathSender + "/");
            Path targetLocationSender = pathSender.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocationSender, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }

        for(String receiver : receivers){
            Path pathReceiver = Paths.get(this.fileStorageLocation + "/" + receiver + "/Attachments/" + id);
            
            // if directory is not present then it will be created
            try {
                Files.createDirectories(pathReceiver);
            } catch (Exception e) {
                throw new FileStorageException("Could not create the directory", e);
            }
            // add file to directory
            try {
                pathReceiver = Paths.get(pathReceiver + "/");
                Path targetLocationReceiver = pathReceiver.resolve(fileName);
                Files.copy(file.getInputStream(), targetLocationReceiver, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException ex) {
                throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
            }
        }
        return fileName;
    }

    public Resource loadFileAsResource(String fileName, String emailAddress, String id) {
        try {
            Path path = Paths.get(this.fileStorageLocation + "/" +emailAddress + "/Attachments/" + id);
            Path filePath = path.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
    }
}