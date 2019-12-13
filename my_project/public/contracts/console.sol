pragma solidity ^0.4.22;
 
//通过log函数重载，对不同类型的变量trigger不同的event，实现solidity打印效果，使用方法为：log(string name, var value)
 
contract console {
    event LogUint256(string, uint256);
    function log(string s , uint256 x) internal {
    emit LogUint256(s, x);
    }
 
    event LogInt(string, int);
    function log(string s , int x) internal {
    emit LogInt(s, x);
    }
 
    event LogBytes(string, bytes);
    function log(string s , bytes x) internal {
    emit LogBytes(s, x);
    }
 
    event LogBytes32(string, bytes32);
    function log(string s , bytes32 x) internal {
    emit LogBytes32(s, x);
    }
 
    event LogAddress(string, address);
    function log(string s , address x) internal {
    emit LogAddress(s, x);
    }
 
    event LogBool(string, bool);
    function log(string s , bool x) internal {
    emit LogBool(s, x);
    }
    
    event LogString(string, string);
    function log(string s , string x) internal {
    emit LogString(s, x);
    }
}
