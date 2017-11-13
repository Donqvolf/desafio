#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
rm -rf /vagrant
mkdir -p /project/.tmp

timedatectl set-timezone "America/Sao_Paulo"
echo "+ Timezone set to America/Sao_Paulo"
echo "cd /project" >> /home/vagrant/.bash_profile

echo "+ Updating Apt Repositories before start"
apt-get -q -y update 1>/dev/null 2>&1

echo "+ Installing git, make and curl"
apt-get -q -y install git make curl 1>/dev/null 2>&1

echo "+ Installing MySQL 5.7.19"
debconf-set-selections <<< 'mysql-apt-config mysql-apt-config/repo-codename select trusty'
debconf-set-selections <<< 'mysql-apt-config mysql-apt-config/repo-distro select ubuntu'
debconf-set-selections <<< 'mysql-apt-config mysql-apt-config/repo-url string http://repo.mysql.com/apt/'
debconf-set-selections <<< 'mysql-apt-config mysql-apt-config/select-server select mysql-5.7'
debconf-set-selections <<< 'mysql-apt-config mysql-apt-config/select-preview select Disabled'
debconf-set-selections <<< 'mysql-apt-config mysql-apt-config/select-tools select Disabled'
debconf-set-selections <<< 'mysql-apt-config mysql-apt-config/select-product select Ok'
cd /tmp/
wget -q http://dev.mysql.com/get/mysql-apt-config_0.7.3-1_all.deb 1>/dev/null 2>&1
dpkg -i mysql-apt-config_0.7.3-1_all.deb 1>/dev/null 2>&1
apt-key adv --keyserver pgp.mit.edu --recv-keys A4A9406876FCBD3C456770C88C718D3B5072E1F5 1>/dev/null 2>&1
apt-get -qq update 1>/dev/null 2>&1
debconf-set-selections <<< "mysql-community-server mysql-community-server/data-dir select ''"
debconf-set-selections <<< "mysql-community-server mysql-community-server/root-pass password root"
debconf-set-selections <<< "mysql-community-server mysql-community-server/re-root-pass password root"
apt-get install --force-yes -qq mysql-server mysql-client 1>/dev/null 2>&1
echo -e "[client]\nuser=root\npassword=root" | tee /home/vagrant/.my.cnf 1>/dev/null 2>&1
echo -e "[client]\nuser=root\npassword=root" | tee /root/.my.cnf 1>/dev/null 2>&1
service mysql restart 1>/dev/null 2>&1

echo "+ Installing Node.js 8.9 and NPM"
git clone https://github.com/visionmedia/n.git /opt/n  1>/dev/null 2>&1
cd /opt/n
make install  1>/dev/null 2>&1
n 8.9  1>/dev/null 2>&1
npm i -g npm 1>/dev/null 2>&1

echo "+ Installing PM2, Gulp, Grunt and N"
sudo npm install -g pm2 gulp grunt n 1>/dev/null 2>&1

echo "+ Installing Project Dependencies"
cd /project ; npm install 1>/dev/null 2>&1

echo "+ Updating Apt Repositories after finished"
sudo apt-get -q -y update 1>/dev/null 2>&1

exit 0

