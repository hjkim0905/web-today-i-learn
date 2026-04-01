# DB - 실습

## 문제 1: 테이블 생성하기 (CREATE TABLE)

#### 1. `attendance` 테이블은 중복된 데이터가 쌓이는 구조이다. 중복된 데이터는 어떤 컬럼인가?

- 중복된 데이터는 crew_id와 nickname이다.

#### 2. `attendance` 테이블에서 중복을 제거하기 위해 crew 테이블을 만들려고 한다. 어떻게 구성해 볼 수 있을까?

- crew_id를 primary key로 놓고, nickname을 필드로 두는 테이블을 만들면 된다.

#### 3. `crew` 테이블에 들어가야 할 크루들의 정보는 어떻게 추출할까? (hint: DISTINCT)

```
SELECT DISTINCT(crew_id), nickname FROM attendance;
```

#### 4. 최종적으로 crew 테이블 생성:

```
CREATE TABLE crew (
  crew_id INT NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(50) NOT NULL,
  PRIMARY KEY (crew_id)
);
```

#### 5. attendance 테이블에서 크루 정보를 추출해서 crew 테이블에 삽입하기:

```
INSERT INTO crew (crew_id, nickname) SELECT DISTINCT(crew_id), nickname FROM attendance;
```

## 문제 2: 테이블 컬럼 삭제하기 (ALTER TABLE)

#### 1. crew 테이블을 만들고 중복을 제거했다. attendance에서 불필요해지는 컬럼은?

- 불필요해지는 컬럼은 nickname이다. crew_id는 나중에 crew 테이블에서 JOIN을 통해 닉네임을 가져와야할 때 외래키로 사용되어야 해서 남겨놓아야 한다.

#### 2. 컬럼을 삭제하려면 어떻게 해야 하는가?

```
ALTER TABLE attendance DROP COLUMN nickname;
```

## 문제 3: 외래키 설정하기

#### 1. 만약에 `crew` 테이블에는 `crew_id`가 `12`번인 크루가 존재하지 않지만, `attendance` 테이블에는 여전히 `crew_id`가 `12`번인 크루가 존재한다면?

```
ALTER TABLE attendance ADD FOREIGN KEY (crew_id) REFERENCES crew (crew_id);
```

## 문제 4: 유니크 키 설정

#### 1. 우아한테크코스에서는 닉네임의 '중복'이 엄연히 금지된다. 그런데 현재 테이블에는 중복된 닉네임이 담길 수 있다. `crew` 테이블의 결함을 어떻게 해결할 수 있을까?

```
ALTER TABLE crew ADD CONSTRAINT unique_nickname UNIQUE (nickname);
```

## 문제 5: 크루 닉네임 검색하기 (LIKE)

#### 1. 3월 4일, 아침에 검프에게 어떤 크루가 상냥하게 인사했다. 그런데 검프도 구면인 것 같아서 닉네임 첫 글자가 `디`라는 건 떠올랐는데... 누구지?

```
SELECT nickname FROM crew WHERE nickname LIKE '디%';
```

## 문제 6: 출석 기록 확인하기 (SELECT + WHERE)

#### 1.`성실`의 아이콘 어셔는 등굣길에 스마트폰을 떨어뜨리는 바람에 3월 6일에 등교/하교 버튼을 누르지 못했다. 담당 코치에게 빠르게 공유한 그를 구제하기 위해 검프가 출석 처리를 해 주려고 한다.

```
어셔: 안녕하세요 검프. 저는 3월 6일 09시 31분에 등교하고 18시 01분에 하교했습니다. 감사합니다.
검프: 네 ^^;;; (이거 어쩌나...)
```

#### 일단, 정말로 어셔의 기록이 누락됐는지부터 확인해 보자.

```
SELECT * FROM attendance AS a INNER JOIN crew AS c ON a.crew_id = c.crew_id
WHERE c.nickname = '어셔' AND a.attendance_date = '2025-03-06';
```

## 문제 7: 누락된 출석 기록 추가 (INSERT)

#### 1. 확인해 보니, 어셔는 그날 출석 체크를 하지 못한 것이 사실로 드러났다. 사후 처리를 위해 출석을 추가해야 하는데 어떻게 추가해야 할까?

```
INSERT INTO attendance (crew_id, attendance_date, start_time, end_time) VALUES ((SELECT crew_id FROM crew WHERE nickname = '어셔'), '2025-03-06', '09:31:00', '18:01:00');
```

## 문제 8: 잘못된 출석 기록 수정 (UPDATE)

#### 1. 주니는 3월 12일 10시 정각에 캠퍼스에 도착했지만, 등교 버튼을 누르는 것을 깜빡하고 데일리 미팅에 참여했다. 뒤늦게야 알게 됐는데 시각은 10시 5분... 지각 처리가 되는 시점이었다.

```
주니: 검프~! 제가 3월 12일 10시 정각에 캠퍼스에 도착했는데 깜빡하고 등교 버튼을 늦게 눌렀어요. 나중에 확인해 보니까 10시 5분이더라구욥ㅠ 👉🏻👈🏻 ... 죄송한데 한 번만 출석 처리 해주실 수 있을까욥??? 🥹🥹
검프: 네 ^^;;; (그냥 지각 처리하면 안 되나ㅠㅠ)
```

```
UPDATE attendance AS a INNER JOIN crew AS c ON a.crew_id = c.crew_id SET a.start_time = '10:00:00'
WHERE c.nickname = '주니' AND a.attendance_date = '2025-03-12';
```
