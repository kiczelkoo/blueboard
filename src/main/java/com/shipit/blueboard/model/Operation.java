package com.shipit.blueboard.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Operation {

    private String uuid;
    private String name;
    private MyPosition currentPos;
    private MyPosition prevPos;
    private int lineWidth;
    private String lineColor;
    private String lineCap;
    private String image;


    public Operation(String name) {
        this.name = name;
    }

    public Operation(@JsonProperty("name") String name, @JsonProperty("currentPos") MyPosition currentPos,
                     @JsonProperty("prevPos") MyPosition prevPos, @JsonProperty("lineWidth") int lineWidth,
                     @JsonProperty("lineColor") String lineColor,
                     @JsonProperty("lineCap") String lineCap, @JsonProperty("uuid") String uuid, @JsonProperty("image") String image) {
        this.name = name;
        this.currentPos = currentPos;
        this.prevPos = prevPos;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.lineCap = lineCap;
        this.uuid = uuid;
        this.image = image;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public MyPosition getCurrentPos() {
        return currentPos;
    }

    public void setCurrentPos(MyPosition currentPos) {
        this.currentPos = currentPos;
    }

    public MyPosition getPrevPos() {
        return prevPos;
    }

    public void setPrevPos(MyPosition prevPos) {
        this.prevPos = prevPos;
    }

    public int getLineWidth() {
        return lineWidth;
    }

    public void setLineWidth(int lineWidth) {
        this.lineWidth = lineWidth;
    }

    public String getLineColor() {
        return lineColor;
    }

    public void setLineColor(String lineColor) {
        this.lineColor = lineColor;
    }

    public String getLineCap() {
        return lineCap;
    }

    public void setLineCap(String lineCap) {
        this.lineCap = lineCap;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
