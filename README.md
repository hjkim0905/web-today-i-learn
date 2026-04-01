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
