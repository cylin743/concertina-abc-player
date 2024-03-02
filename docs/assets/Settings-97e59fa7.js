const e={left:{push:{"E,":"l1a","A,":"l2a","^C":"l3a",A:"l4a","^G":"l5a","C,":"l1","G,":"l2",C:"l3",E:"l4",G:"l5","B,":"l6",D:"l7",B:"l9",d:"l10"},pull:{"F,":"l1a","_B,":"l2a","^D":"l3a",G:"l4a",_B:"l5a","G,":"l1","B,":"l2",D:"l3",F:"l4",A:"l5","A,":"l6","^F":"l7",c:"l9",e:"l10"}},right:{push:{"^c":"r1a",a:"r2a","^g":"r3a","^c'":"r4a","F'":"r5a",c:"r1",e:"r2",g:"r3","c'":"r4","e'":"r5",b:"r7","d'":"r8","g'":"r9","b'":"r10"},pull:{"^d":"r1a",g:"r2a",_b:"r3a","^d'":"r4a","a'":"r5a",B:"r1",d:"r2",f:"r3",b:"r5","^f":"r6",a:"r7","c'":"r8","e'":"r9","^f'":"r10"}}},a=Object.keys(e.right.push).concat(Object.keys(e.left.push));var t={};Object.keys(e.right.push).map(function(r){t[r]=e.right.push[r]});Object.keys(e.left.push).map(function(r){t[r]=e.left.push[r]});const f=t,G=Object.keys(e.right.pull).concat(Object.keys(e.left.pull));var z={};Object.keys(e.right.pull).map(function(r){z[r]=e.right.pull[r]});Object.keys(e.left.pull).map(function(r){z[r]=e.left.pull[r]});const D=z,i=function(r,l){switch(r){case"D":l=="F"&&(l="^F"),l=="f"&&(l="^f"),l=="c"&&(l="^c"),l=="C"&&(l="^C");break;case"G":l=="F"&&(l="^F"),l=="f"&&(l="^f");break;case"F":l=="b"&&(l="_b"),l=="B"&&(l="_B"),l=="B,"&&(l="_B,");break}return l},p=`X:1
T:Off to California
R: Hornpipe
M:4/4
L:1/8
K:G
Q:120
V:1 clef=treble name="Main"      sname="M."
[V:1]|:(3DEF||GF GB AG ED| GB dg e2 (3def| gf gd ed BG|
[V:2]|:(3zzD|D2 z2 D2 z2|D2 z2 [EC]2 (3zzz | D2 z2 [CE]z z2|
[V:1]|AB AG E2 (3DEF | GF GB AG ED| GB dg e2 (3def| gf gd ed BG| AG EF G2:|
[V:2]|Ez z2 C2 (3zzD| D2 z2 D2 z2| D2 z2 [CE]2 (3zzz| [DG]2 z2 [CE]2 z2| E2 zD D2:|
[V:1]|:(3def | gf eg fe df| e2 e2 ed Bd | gf gd ed BG|
[V:2]|:(3zzz | [GD]2 z2 [DA]2 z2| [CE]2 z2 z2 z2 | [DG]2 z2 [GEB]2 z2|
[V:1]|AB AG E2 (3DEF | GF GB AG ED| GB dg e2 (3def| gf gd ed BG | AG EF G2:| 
[V:2]|E2 z2 C2 (3zzD | D2 z2 D2 z2| D2 z2 [CE]2 (3zzz| [DG]2 z2 [BGE]2 z2 | E2 zD D2:| 
`;export{G as a,D as b,f as c,p as d,i as g,a as s};
