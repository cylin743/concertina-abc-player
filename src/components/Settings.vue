<script>
const tablatureMapping = {
  "left":{
    "push": {
      "E,": "l1a",
      "A,": "l2a",
      "^C": "l3a",
      "A": "l4a",
      "^G": "l5a",
      "C,": "l1",
      "G,": "l2",
      "C": "l3",
      "E": "l4",
      "G": "l5",
      "B,": "l6",
      "D": "l7",
      "B": "l9",
      "d": "l10",
    },
    "pull":{
      "F,": "l1a",
      "_B,": "l2a",
      "^D": "l3a",
      "G": "l4a",
      "_B": "l5a",
      "G,": "l1",
      "B,": "l2",
      "D": "l3",
      "F": "l4",
      "A": "l5",
      "A,": "l6",
      "^F": "l7",
      "c": "l9",
      "e": "l10",
    }
  },
  "right":{
    "push": {
      "^c": "r1a",
      "a": "r2a",
      "^g": "r3a",
      "^c'": "r4a",
      "F'": "r5a",
      "c": "r1",
      "e": "r2",
      "g": "r3",
      "c'": "r4",
      "e'": "r5",
      "b": "r7",
      "d'": "r8",
      "g'": "r9",
      "b'": "r10",
    },
    "pull":{
      "^d": "r1a",
      "g": "r2a",
      "_b": "r3a",
      "^d'": "r4a",
      "a'": "r5a",
      "B": "r1",
      "d": "r2",
      "f": "r3",
      "b": "r5",
      "^f": "r6",
      "a": "r7",
      "c'": "r8",
      "e'": "r9",
      "^f'": "r10",
    }
  }
}
const scalePushList = Object.keys(tablatureMapping["right"]["push"]).concat(Object.keys(tablatureMapping["left"]["push"]))
var scalePushMap= {}
Object.keys(tablatureMapping["right"]["push"]).map(function(key){
  scalePushMap[key] = tablatureMapping["right"]["push"][key]
})
Object.keys(tablatureMapping["left"]["push"]).map(function(key){
  scalePushMap[key] = tablatureMapping["left"]["push"][key]
})
const scalePushMapping = scalePushMap
const scalePullList = Object.keys(tablatureMapping["right"]["pull"]).concat(Object.keys(tablatureMapping["left"]["pull"]))
var scalePullMap = {}
Object.keys(tablatureMapping["right"]["pull"]).map(function(key){
  scalePullMap[key] = tablatureMapping["right"]["pull"][key]
})
Object.keys(tablatureMapping["left"]["pull"]).map(function(key){
  scalePullMap[key] = tablatureMapping["left"]["pull"][key]
})
const scalePullMapping = scalePullMap
const getScaleAfterKeyConvert = function(key, scale){
          switch(key){
            case 'D':
              if(scale == "F"){
                scale = "^F"
              }
              if(scale == "f"){
                scale = "^f"
              }
              if(scale == "c"){
                scale = "^c"
              }
              if(scale == "C"){
                scale = "^C"
              }
              break
            case 'G':
              if(scale == "F"){
                scale = "^F"
              }
              if(scale == "f"){
                scale = "^f"
              }
              break
            case 'F':
              if(scale == "b"){
                scale = "_b"
              }
              if(scale == "B"){
                scale = "_B"
              }
              if(scale == "B,"){
                scale = "_B,"
              }
              break
          }
          return scale
        }
const dTune = `X: 3
T:Happy Birthday to You
M:3/4
L:1/8
Q:80
K:G
D>D | E2 D2 G2 | F4 D>D | E2 D2 A2 | G4 D>D | d2 B2 G2 | (F2 E2) c>c |
B2 G2 A2 | G6 |]`
export {tablatureMapping, scalePushList, scalePushMapping, scalePullList, scalePullMapping, getScaleAfterKeyConvert, dTune}
</script>