package com.iiitb.lms.utils;

public class LMSConstants {

    public static final char ACCOUNT_STATUS_BLOCKED = 'B';
    public static final char ACCOUNT_STATUS_ACTIVE = 'A';
    public static final char BOOK_STATUS_RESERVED = 'R';
    public static final char BOOK_STATUS_AVAILABLE = 'A';
    public static final char BOOK_STATUS_ISSUED = 'I';
    public static final char BOOK_STATUS_LOST = 'L';
    public static final int USER_TYPE_MEMBER = 2;
    public static final int USER_TYPE_LIBRARIAN = 1;
    public static final int RESERVE_DAYS = 2;
    public static final int ISSUE_DAYS = 7;
    public static final String RESERVATION_STATUS_RESERVED = "Reserved";
    public static final String RESERVATION_STATUS_DENIED = "Denied";
    public static final char BOOK_RESERVATION_STATUS_APPROVED = 'A';
    public static final char BOOK_RESERVATION_STATUS_DELETED = 'D';
    public static final char BOOK_RESERVATION_STATUS_RESERVED = 'R';
    public static final String RESERVATION_STATUS_APPROVED = "Approved";
    public static final int MAX_NO_OF_RESERVATIONS = 20;
    public static final int MAX_NO_OF_ISSUES = 20;
    public static final char BOOK_LEND_STATUS_BORROWED = 'B';
    public static final char BOOK_LEND_STATUS_RETURNED = 'R';
    public static final char BOOK_LEND_STATUS_LOST = 'L';
    public static final char BOOK_LEND_STATUS_FINE_PAID = 'F';
    public static final float FINE_PER_DAY = 20;
    public static final char FINE_TRANSACTION_STATUS_COMPLETE = 'C';
    public static final char FINE_TRANSACTION_STATUS_PROCESSING = 'P';
    public static final char FINE_TRANSACTION_STATUS_FAILED = 'F';
    public static final String FINE_TRANSACTION_MODE_CASH = "Cash";
    public static final String FINE_TRANSACTION_MODE_UPI = "UPI";
    public static final String FINE_TRANSACTION_MODE_DEBIT = "Debit Card";

}
