// 비동기 작업 처리하기
// 1. 콜백 함수
function add(a, b, callback) {
  setTimeout(() => {
    const sum = a + b;
    callback(sum);
  }, 2000);
}
add(3, 4, (value) => {
  console.log(value);
});

// 음식주문 콜백지옥
function orderFood(callback) {
  setTimeout(() => {
    const food = "엽떡";
    callback(food);
  }, 3000);
}

function cooldownFood(food, callback) {
  setTimeout(() => {
    const cooldownedFood = `식은 ${food}`;
    callback(cooldownedFood);
  }, 2000);
}

function freezeFood(food, callback) {
  setTimeout(() => {
    const freezedFood = `냉동진행 ${food}`;
    callback(freezedFood);
  }, 1500);
}

function warmUpFood(food, callback) {
  setTimeout(() => {
    const warmUpedFood = `${food}데우기`;
    callback(warmUpedFood);
  }, 1000);
}

orderFood((food) => {
  console.log(food);

  cooldownFood(food, (cooldownedFood) => {
    console.log(cooldownedFood);

    freezeFood(cooldownedFood, (freezedFood) => {
      console.log(freezedFood);

      warmUpFood(freezedFood, (warmUpedFood) => {
        console.log(warmUpedFood);
      });
    });
  });
});
