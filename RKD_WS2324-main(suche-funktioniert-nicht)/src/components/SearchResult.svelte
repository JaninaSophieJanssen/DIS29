<!-- SearchResult.svelte -->
<script lang="ts">
    
    export let professorDetails;
    export let data;

    let arrow_down = "./images/arrow_down.png";
    let arrow_up = "./images/arrow_up.png";

    let themengebiet_open = false;

    // Funktion, die aufgerufen wird, wenn der Button geklickt wird
    function onClickThemen() {
        themengebiet_open = !themengebiet_open;
    }

     // Funktion zum Abrufen der Fakultätsinformation
    function getFacInst(details) {
        return details["fac_inst"] || "Fakultät nicht verfügbar";
    }
</script>

<style>
    
        .topLevelContainer {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-left: 30px;
            padding-right: 30px;
            margin-bottom: 10px;
            background-color: #F8F8F8;
            -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
            -moz-box-sizing: border-box;    /* Firefox, other Gecko */
            box-sizing: border-box;         /* Opera/IE 8+ */
        }
    
        .secondLevelContainer {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-left: 30px;
            padding-right: 30px;
            margin-bottom: 10px;
            background-color: #E7E7E7;
            -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
            -moz-box-sizing: border-box;    /* Firefox, other Gecko */
            box-sizing: border-box;         /* Opera/IE 8+ */
        }
    
        .thirdLevelContainer {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-left: 30px;
            padding-right: 30px;
            margin-bottom: 10px;
            background-color: #C3C3C3;
            -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
            -moz-box-sizing: border-box;    /* Firefox, other Gecko */
            box-sizing: border-box;         /* Opera/IE 8+ */
        }
        .fourthLevelContainer {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-left: 30px;
            padding-right: 30px;
            margin-bottom: 10px;
            background-color: #9d9d9d;
            -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
            -moz-box-sizing: border-box;    /* Firefox, other Gecko */
            box-sizing: border-box;         /* Opera/IE 8+ */
        }
    
        .topLevelTopic {
            width: 100%;
            height:100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    
        .fachTitle {
            width: 80%;
            text-align: left;
            overflow-x: auto;
            font-size: 20px;
        }
    
        .infoContainer {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }
    
        .image_container {
            max-width: 45px;
            height: 45px;
            border: none;
            background-color: transparent;
            margin: 0;
        }
    
        .image {
            width: 100%;
        }
    
        .type_title{
            font-size: 20px;
        }
    
    
    </style>


<div class="topLevelContainer">
    <div class="topLevelTopic">
        <p class="type_title">
            {professorDetails["name"]} | {getFacInst(professorDetails)}
        </p>
        <button class="image_container" on:click={onClickThemen}>
            <img src={!themengebiet_open ? arrow_down : arrow_up} alt="arrow_down" class="image" />
        </button>
    </div>
    {#if themengebiet_open}
        <div class="secondLevelContainer">
            <div class="thirdLevelContainer">
                <div class="infoContainer">
                    <h3 style="text-align:left;">
                        Email:
                    </h3>
                    <p style="text-align: left; margin: 10px;">
                        {professorDetails["Email"]}
                    </p>
                    <h3 style="text-align:left;">
                        Personenseite:
                    </h3>
                    <li style="text-align: left; margin: 10px;">
                        <a href={professorDetails["Kontaktseite"]}>
                            {professorDetails["Kontaktseite"]}
                        </a>
                    </li>
                    <h3 style="text-align:left;">
                        Relevante Links:
                    </h3>
                    <ul style="overflow-x:auto">
                        {#each professorDetails["links"] as link}
                        <li style="text-align: left; margin: 10px;">
                            <a href={link}>
                                {link}
                            </a>
                        </li>
                        {/each}
                    </ul>
                    <h3 style="text-align:left;">
                        Schlagworte:
                    </h3>
                    <ul style="overflow-x:auto">
                        {#each professorDetails["schlagworte"] as wort}
                        <li style="text-align: left; margin: 10px;">
                            <p>
                                {wort}
                            <p>
                        </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    {/if}
</div>