package com.iiitb.lms.services.impl;

abstract class AbstractBookItemService {

    abstract void verifyRequest(Object inputDetails) throws Exception;
    abstract Object processRequest(Object inputDetails);
    public final Object execute(Object inputDetails) throws Exception {
        verifyRequest(inputDetails);
        return processRequest(inputDetails);
    }

}
