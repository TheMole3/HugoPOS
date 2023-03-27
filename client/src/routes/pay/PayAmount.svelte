<script>
    export let products;
    export let setScreen;
    export let payment;

    let money = 0;
    $: {
        if(products) money = Math.floor(products.reduce(function (acc, obj) { return acc + (obj.price * obj.count * ( 1 + obj.moms )); }, 0));
    }

    let paid = "";

    $: {
        payment.amount = ((parseInt(paid)||0) * 0.01)
    }

    let buttons = [
        {text:"1", val:"1"},
        {text:"2", val:"2"},
        {text:"3", val:"3"},
        {text:"4", val:"4"},
        {text:"5", val:"5"},
        {text:"6", val:"6"},
        {text:"7", val:"7"},
        {text:"8", val:"8"},
        {text:"9", val:"9"},
        {text:"00", val: "00"},
        {text:"0", val:"0"},
        {text:"⌫", special: "erase"}
    ]

    let error = null;

    let buttonPress = (special, val) => {
        window?.navigator?.vibrate?.(50);
        error = null;
        if(!special) {
            paid += val
        } else if(special == "erase") {
            paid = paid.slice(0, -1);
        }
    }

    let printButton = () => {
        // Check if there is enough money
        if(payment.amount < money) {
            error = "För lågt belopp"
        } else {

            fetch('http://192.168.86.24:3000/print', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({products, payment})
            })
            .then((response) => response)
            .then((response) => {
                if(response.status != 200) return error = "Kunde inte ansluta till skrivaren";

                console.log(JSON.stringify(response));
                setScreen(0);

                for(let productI in products) {
                    products[productI].count = 0;
                }

            }).catch((err) => {
                error = "Kunde inte ansluta till skrivaren"
            }) 
        }

    }
</script>

<div class="relative p-3 mt-5 w-full h-64">
    <div class="rounded-lg bg-base-200 brightness-95 w-full h-full">
        <span class="absolute font-semibold p-3">Total {money.toFixed(2)} kr</span>

        <div class="flex flex-col items-center justify-center w-full h-full {error?"text-red-800":""}">
            <span class="text-5xl font-bold">{payment.amount.toFixed(2)} kr</span>

            {#if error}
                <span class="mt-2">{error}</span>
            {:else if payment.amount.toFixed(2) <= money}
                <span class="mt-2">Mottaget {(""+payment.type).toLowerCase()}</span>
            {:else}
                <span class="mt-2">Växel: {payment.amount.toFixed(2) - money} kr</span>
            {/if}
        </div>

    </div>
</div>

<div class="fixed bottom-0 p-3 w-full grid grid-cols-3">
    {#each buttons as button, i}
        <button on:click={() => {buttonPress(button.special, button.val)}} class="aspect-video border-base-300 { (i+-1)%3 === 0 ?"border-r-2 border-l-2":""} {i<9?"border-b-2":""}">{button.text}</button>
    {/each}
    <button on:click={printButton} class="col-span-3 btn btn-primary h-16 mt-5 mb-5">Skriv ut kvitto</button>
</div>