create table workdays(
workdayID serial not null primary key,
workday text not null
);
INSERT INTO workdays (workday) VALUES ('n/a');
INSERT INTO workdays (workday) VALUES ('monday');
INSERT INTO workdays (workday) VALUES ('tuesday'); 
INSERT INTO workdays (workday) VALUES ('wednesday');
INSERT INTO workdays (workday) VALUES ('thursday');
INSERT INTO workdays (workday) VALUES ('friday');
INSERT INTO workdays (workday) VALUES ('saturday');
INSERT INTO workdays (workday) VALUES ('sunday');

create table waiters(
    waiterID serial not null primary key,
    waiter text not null
);

INSERT INTO waiters (waiter) VALUES ('john');
INSERT INTO waiters (waiter) VALUES ('sandy');
INSERT INTO waiters (waiter) VALUES ('jack');
INSERT INTO waiters (waiter) VALUES ('nat');

CREATE TABLE shifts (
    waiterID int,
    workdayID int,
    FOREIGN KEY (waiterID) REFERENCES waiters(waiterID),
    FOREIGN KEY (workdayID) REFERENCES workdays(workdayID)
);