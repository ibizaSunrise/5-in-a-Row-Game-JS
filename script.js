let field = game.querySelector('.field');
        let gamers = ['gamer1', 'gamer2'];
        let gamerNum = 0;
        let rowNum = 20;
        let colNum = 30;

        let rows = fillField(field, rowNum, colNum);

        let cols = getColumns(rows);
        let diag1 = getDiagArr(rows);
        let diag2 = getDiagArr(reverseArr(rows));
        let lines = [...rows, ...cols, ...diag1, ...diag2];


        function checkWin(gamer, lines) {

            for (let i = 0; i < lines.length; i++) {
                for (let j = 4; j < lines[i].length; j++) {

                    if (lines[i][j - 4].classList.contains(gamer) && lines[i][j - 3].classList.contains(gamer) && lines[i][j - 2].classList.contains(gamer) && lines[i][j - 1].classList.contains(gamer) && lines[i][j].classList.contains(gamer)) {
                        return true;
                    }

                }
            }

            return false;
        }
        function endGame(gamer) {
            let strUpper = gamer.slice(0, 1).toUpperCase() + gamer.slice(1);
            swal(` ${strUpper} Win !`).then(val => {
                if (val) window.location.reload();
            })

        }

        function isWin(gamers, lines) {
            for (let i = 0; i < gamers.length; i++) {
                if (checkWin(gamers[i], lines)) {
                    endGame(gamers[i]);
                    break;
                }
            }
        }

        function fillField(field, rowNum, colNum) {
            let rows = [];
            for (let i = 0; i < rowNum; i++) {
                let tr = document.createElement('tr');
                rows[i] = [];
                for (let j = 0; j < colNum; j++) {
                    let td = document.createElement('td');
                    tr.appendChild(td);
                    td.addEventListener('click', cellClickHandler);
                    rows[i][j] = td;
                }
                field.append(tr);
            }

            return rows;
        }

        function cellClickHandler() {
            this.classList.add(gamers[gamerNum]);
            this.removeEventListener('click', cellClickHandler);
            isWin(gamers, lines);
            gamerNum++;

            if (gamerNum == gamers.length) {
                gamerNum = 0;
            }
        }

        function getColumns(arr) {
            let result = [];
            for (let i = 0; i < arr.length; i++) {

                for (let j = 0; j < arr[i].length; j++) {

                    if (result[j] === undefined) {
                        result[j] = []
                    }

                    result[j][i] = arr[i][j]
                }

            }

            return result
        }


        function getDiagArr(arr) {

            let result = []
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].length; j++) {

                    if (result[i + j] === undefined) {
                        result[i + j] = []
                    }

                    result[i + j].push(arr[i][j]);
                }
            }
            return result
        }

        function reverseArr(arr) {
            let result = arr.map(el => el.reverse());
            return result
        }
