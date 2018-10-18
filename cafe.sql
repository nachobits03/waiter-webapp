create table workdays(
workdayID serial not null primary key,
workday text not null
);

INSERT INTO workdays (workday) VALUES ('monday');
INSERT INTO workdays (workday) VALUES ('tuesday'); 
INSERT INTO workdays (workday) VALUES ('wednesday');
INSERT INTO workdays (workday) VALUES ('thursday');
INSERT INTO workdays (workday) VALUES ('friday');
INSERT INTO workdays (workday) VALUES ('saturday');
INSERT INTO workdays (workday) VALUES ('sunday');

create table waiters(
    waiterID serial not null primary key,
    waiter text not null,
    waiterPW text not null
);

INSERT INTO waiters (waiter, waiterPW) VALUES ('john', 'john');
INSERT INTO waiters (waiter, waiterPW) VALUES ('sandy', 'sandy');
INSERT INTO waiters (waiter, waiterPW) VALUES ('jack', 'jack');
INSERT INTO waiters (waiter, waiterPW) VALUES ('nat', 'nat');

CREATE TABLE shifts (
    shiftID serial NOT NULL primary key,
    waiterID int,
    workdayID int,
    FOREIGN KEY (waiterID) REFERENCES waiters(waiterID),
    FOREIGN KEY (workdayID) REFERENCES workdays(workdayID)
);