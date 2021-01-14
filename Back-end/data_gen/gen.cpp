#include <fstream>
#include <string>
#include <sstream>

std::string create_user(int index) {
    std::stringstream ss;
    //                  username password email
    // CALL `create_user`('?', '_', '?', 'Member');
    ss << "CALL `create_user`('vinabot" << index << "', '64e3d8c99a47e902a56ba96f1f89df3f8b42d6e9691dfbe0b05f13449d2b2636','vinabot" << index << "@vina.ghost', 'Member');";
    
    return std::string(ss.str());
}


int main() {
    std::ofstream f("output.sql");

    const auto count = 1000;

    for ( auto i = 1; i < count + 1; i++ ) {
        f << create_user(i) << "\n";
    }

    f.close();    
    return 0;
}