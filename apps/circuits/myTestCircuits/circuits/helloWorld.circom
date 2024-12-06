pragma circom 2.0.0;

template HelloWorld () {  
  signal input a;  
  signal input b;
  signal input c;
  signal output out;  
  signal d;

  assert(a != 1);
  assert(b != 1);
  d <== a * b;
  out <== c + d;
}
component main {public [a, b]} = HelloWorld();
