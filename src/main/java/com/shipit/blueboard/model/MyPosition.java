package com.shipit.blueboard.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MyPosition {
    private float x;
    private float y;

    public MyPosition() {
    }

    public MyPosition(@JsonProperty("x") float x, @JsonProperty("y") float y) {
        this.x = x;
        this.y = y;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }
}
