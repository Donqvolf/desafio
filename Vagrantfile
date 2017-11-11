require "yaml"
require "fileutils"

CONF = YAML.load(File.open(File.join(File.dirname(__FILE__), "bootstrap/vm/config.yml"), File::RDONLY).read)

VAGRANTFILE_API_VERSION = "2"
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"
  config.vm.box = "bento/ubuntu-17.04"
  config.vm.hostname = CONF['vm']['name']
  config.vm.network "private_network", type: "dhcp"
  config.vm.network "forwarded_port", guest: 80, host: 8080, auto_correct: true
  config.vm.network "forwarded_port", guest: 3000, host: 3000, auto_correct: true
  config.vm.usable_port_range = 52000..53000

  config.vm.provider "virtualbox" do |vb|
    vb.name = CONF['vm']['name']
    vb.customize ["modifyvm", :id, "--memory", CONF['vm']['memory']]
  end

  config.vm.define CONF['vm']['name'] do |vb|
  end

  cache_apt = vcache(config.vm.box)
  config.vm.synced_folder cache_apt, "/var/cache/apt/archives/", type: "nfs", nfs_udp: false
  config.vm.synced_folder ".", "/vagrant", disabled: true
  config.vm.synced_folder ".", "/project", type: "nfs", nfs_udp: false

  config.vm.provision "shell", path: "./bootstrap/build.sh"
end

def vcache(box_name)
  cache_dir = File.join(File.expand_path("~"), '.vagrant.d', 'cache', 'apt', box_name)
  partial_dir = File.join(cache_dir, 'partial')
  FileUtils.mkdir_p(partial_dir) unless File.exists? partial_dir
  cache_dir
end

