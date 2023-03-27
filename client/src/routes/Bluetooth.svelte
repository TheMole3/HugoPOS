<script>

    

    let a;
    let connect = () => {
        console.log(navigator.bluetooth)
        if(typeof navigator.bluetooth !== "undefined") {

            navigator.bluetooth
            .requestDevice({acceptAllDevices: true})
            .then((device) => {
                console.log(`Name: ${device.name}`);
                a = device;
            })
            .catch((error) => {
                console.error(`Something went wrong. ${error}`)
                a=error;
            });
            
        }
    }
</script>


<button class="btn" on:click={connect}>Connect to bluetooth</button><br>
{a}