import { Random, Console } from '@woowacourse/mission-utils';
// Random 값 추출은 Random.pickNumberInRange()를 활용한다
// 사용자의 값을 입력 받고 출력하기 위해서는 Console.readLineAsync, Console.print를 활용한다.

class App {
  async play() {
    let gameEnded = false;

    while (!gameEnded) {
      //임의로 정답 지정
      const computer = []; //const는 선언 후 값 변경 불가, 배열(정답) 지정
      while (computer.length < 3) {
        // 3자리수로 각 자리의 수를 중복 없이 설정(1~9)
        const number = Random.pickNumberInRange(1, 9);
        if (!computer.includes(number)) {
          // 연산자로 중복 확인 중복이 없는 경우에만 push함수로 값을 추가하여 중복제외
          computer.push(number);
        }
      }

      // 입력
      // 세자리 수, 반복문(사이즈축소),
      // 배열을 입력받아서 각 자리의 인덱스로 비교, 조건을

      Console.print('숫자 야구 게임을 시작합니다');

      while (true) {
        const Guess = await Console.readLineAsync('숫자를 입력해주세요: ');
        const GuessNum = Guess.split('').map(Number); // 숫자를 입력받고 split()으로 분리, .map(number)로 정수형 숫자배열로 변환

        if (GuessNum.length !== 3 || GuessNum.some((num) => num < 1 || num > 9)) {
          throw new Error('잘못된 값을 입력했습니다.'); // 배열 길이 3이 아니거나, 숫자가 1~9이외의 값인 경우 throw
        }

        let ball = 0;
        let strike = 0;

        for (let i = 0; i < GuessNum.length; i++) {
          // 볼/스트라이크 기능 구현, 스트라이크가 아님에도 배열에 포함된다면 볼
          if (GuessNum[i] === computer[i]) {
            strike++;
          } else if (computer.includes(GuessNum[i])) {
            ball++;
          }
        }

        // 출력
        if (strike === 3) {
          Console.print('3스트라이크\n3개의 숫자를 모두 맞히셨습니다! 게임 종료');
          // 재시작 여부 확인
          const restart = await Console.readLineAsync(' 게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.');

          if (restart === '2') {
            Console.print('게임을 종료합니다');
            return (gameEnded = true);
          } else if (restart === '1') {
            gameEnded = false; //바깥 while 루프를 다시 반복
          }
          break;
        } else if (strike === 0 && ball === 0) {
          Console.print('낫싱');
        } else {
          Console.print(`${ball}볼, ${strike}스트라이크`); // ${ball}와 같은 문자열 리터럴을 사용시 백틱(``)으로 감싸야 에러발생 X
        }
      }
    }
  }
}

export default App;
