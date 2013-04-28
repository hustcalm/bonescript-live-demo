Originated from [elinux](http://elinux.org/BeagleBone).

BeagleBone's default operating system is Angstrom, which ships with the board. This section provides basic information on Angstrom and other operating systems commonly used on BeagleBone. This information may help in making a preliminary choice, but full details should be obtained from the home sites. 


## Angstrom
*   [Home site](http://www.angstrom-distribution.org/)
*   Mailing lists: [angstrom-distro-devel](http://lists.linuxtogo.org/cgi-bin/mailman/listinfo/angstrom-distro-devel) and [angstrom-distro-users](http://lists.linuxtogo.org/cgi-bin/mailman/listinfo/angstrom-distro-users)
*   [IRC channel](irc://irc.freenode.net/#angstrom)

Ångström was started by a small group of people who worked on the OpenEmbedded, OpenZaurus and OpenSimpad projects to unify their effort to make a stable and user-friendly distribution for embedded devices like handhelds, set top boxes and network-attached storage devices. Ångström can scale down to devices with only 4MB of flash storage.

The Angstrom community does not provide a forum, intentionally.

Angstrom uses Busybox for many key utilities, which has both pros and cons. Advantages include requiring less storage space and a smaller memory footprint for many common utilities, which also improves system startup time and performance. The main disadvantages stem from those utilities not mirroring exactly their full-size counterparts. These differences can be annoying if one is used to standard behavior, and may also break shell scripts that rely on portable functionality.

Angstrom uses connman for network connection management, but no documentation is available for this currently. Also, man(1) and man pages are not provided by default, nor debugging utilities like strace(1) and tcpdump(1). Getting started may therefore present difficulties, depending on experience. 


## Debian
*   See [BeagleBoardDebian](http://elinux.org/BeagleBoardDebian)
*   [Home site](http://wiki.debian.org/ArmEabiPort)
*   [Mailing list](http://lists.debian.org/debian-arm/)
*   [IRC channel](irc://irc.debian.org/debian-arm)

The ARM EABI port is the default port of the standard Debian distribution of Linux for the ARM architecture ("armel"). EABI ("Embedded ABI") is actually a family of ABIs, and one of the "subABIs" is the GNU EABI for Linux which is used for this port. A newer port targeted at newer hardware with another ABI ("armhf") is currently under development and is expected to ship with Debian 7.0 (Wheezy).

The Debian Project is strongly committed to software freedom, and has a long pedigree and a good reputation. 

## Ubuntu
*   See [BeagleBoardUbuntu](http://elinux.org/BeagleBoardUbuntu)
*   [Home site](https://wiki.ubuntu.com/ARM)
*   [IRC channel](irc://irc.freenode.net/#ubuntu-arm)

The vision for Ubuntu is part social and part economic: free software, available free of charge to everybody on the same terms, and funded through a portfolio of services provided by Canonical.

The first version of Ubuntu was based on the GNOME desktop, but has since added a KDE edition, Kubuntu, and a server edition. All of the editions of Ubuntu share common infrastructure and software. In recent years, special emphasis has been placed on netbooks for lightweight, connected, mobile computing, and on the cloud as a new architecture for data centres. 

## Fedora
*   See [BeagleBoardFedora](http://elinux.org/BeagleBoardFedora)
*   [Home site](http://fedoraproject.org/wiki/Architectures/ARM)
*   [Mailing list](http://lists.fedoraproject.org/pipermail/arm/)
*   [IRC channel](irc://irc.freenode.net/#fedora-arm)

The Fedora Project is sponsored by Red Hat, which invests in its infrastructure and resources to encourage collaboration and incubate innovative new technologies. Some of these technologies may later be integrated into Red Hat products. They are developed in Fedora and produced under a free and open source license from inception, so other free software communities and projects are free to study, adopt, and modify them.

Red Hat has been a major player since the earliest days of Linux distributions, and has earned a good reputation for solidity which continues in Fedora. The Fedora ARM initiative is very active (see mailing list). 

## ArchLinux
*   [Home site](http://archlinuxarm.org/platforms/armv7/beaglebone)
*   [Source repository](https://github.com/archlinuxarm/PKGBUILDs)
*   [IRC channel](irc://irc.freenode.net/#archlinux-arm)

Arch Linux for BeagleBone is a version of the Arch Linux ARM distribution. This carries forward the Arch Linux philosophy of simplicity and user-centrism, targeting and accommodating competent Linux users by giving them complete control and responsibility over the system. Instructions are provided to assist in navigating the nuances of installation on the varied ARM platforms; however, the system itself will offer little assistance to the user.

The entire distribution is on a rolling-release cycle that can be updated daily through small packages instead of huge updates on a defined release schedule. Most packages are unmodified from what the upstream developer originally released. 

## Gentoo
*   [Home site](http://dev.gentoo.org/~armin76/arm/beaglebone/install.xml)
*   [IRC channel](irc://irc.freenode.net/#gentoo-embedded)

Gentoo is a source-based meta-distribution of Linux. Instead of distributing a standard system image built with predefined options, Gentoo gives each user the means to create their own customized system that doesn't contain unused bloat and with minimum dependencies. Upgrades are incremental and under user control, so a Gentoo system is normally always up-to-date and wholesale upgrades are avoided.

Being a source-based system, the downside of Gentoo for low-power ARM systems is very long install times for large applications. Cross-compilation on x86 machines and distcc can overcome this problem, but they add complexity. 

## Sabayon
*   [Home site](http://wiki.sabayon.org/index.php?title=Hitchhikers_Guide_to_the_BeagleBone_%28and_ARMv7a%29)
*   [IRC channel](irc://irc.freenode.net/#sabayon)

Sabayon Linux uses the mechanisms of Gentoo to create a pre-configured Linux distribution that can be installed as rapidly as a normal binary distribution, but still retains the benefits of Gentoo's source-based package management. Sabayon on Intel/AMD also provides the Entropy binary package management system, which could in principle greatly ease installation of packages on resource-constrained embedded Linux devices, but this is not yet available for ARM.

Although it is still early days for Sabayon on ARM (and hence on BeagleBone), there is regular progress reported on lxnay's blog, and contributions from the community would probably accelerate the work. 

## Buildroot
*   [Home site](http://www.zoobab.com/beaglebone)
*   [Source repository](https://github.com/fhunleth/buildroot-beaglebone)
*   [Buildroot project site](http://buildroot.uclibc.org/)

Buildroot is a set of Makefiles and patches that makes it easy to generate a complete embedded Linux system. Buildroot can generate any or all of a cross-compilation toolchain, a root filesystem, a kernel image and a bootloader image. Buildroot is useful mainly for people working with small or embedded systems, using various CPU architectures (x86, ARM, MIPS, PowerPC, etc.) : it automates the building process of your embedded system and eases the cross-compilation process.

The resulting root filesystem is mounted read-only, but other filesystems can be mounted read/write for persistence. Although user accounts can be created, in practice almost everything is done as root. Buildroot uses no package manager. Instead, package selection is managed through make menuconfig. 

## Nerves Erlang/OTP
*   [Home site](http://nerves-project.org/)
*   [Source repository](https://github.com/nerves-project/bbone-erlang-buildroot)
*   [Erlang project site](http://www.erlang.org/)

Erlang is a programming language used to build massively scalable soft realtime systems with high availability requirements (5-9’s). Some of its uses are in telecoms, banking, e-commerce, computer telephony and instant messaging. Erlang’s runtime system has built-in support for concurrency, distribution and fault tolerance.

OTP is a set of Erlang libraries and design principles providing middle-ware to develop these systems. It includes its own distributed database, applications to interface towards other languages, debugging and release handling tools.

The Nerves project provides an embedded Linux-based environment for running Erlang and an easy-to-use API to access common I/O interfaces, based on Buildroot (see above). If you are interested in running an Erlang node on a low power ARM-based board such as BeagleBone, this project can get you started. 
