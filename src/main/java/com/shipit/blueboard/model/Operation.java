package com.shipit.blueboard.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Operation {

    private String name;
    private MyPosition currentPos;
    private MyPosition prevPos;
    private int lineWidth;
    private String lineColor;
    private String lineCap;

    public Operation(String name) {
        this.name = name;
    }

    public Operation(@JsonProperty("name") String name, @JsonProperty("currentPos") MyPosition currentPos,
                     @JsonProperty("prevPos") MyPosition prevPos, @JsonProperty("lineWidth") int lineWidth,
                     @JsonProperty("lineColor") String lineColor,
                     @JsonProperty("lineCap") String lineCap) {
        this.name = name;
        this.currentPos = currentPos;
        this.prevPos = prevPos;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.lineCap = lineCap;
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
