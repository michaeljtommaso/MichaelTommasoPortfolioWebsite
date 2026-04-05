const facts = [
    ["Over 10,000 ex-prisoners are released into American communities every week.", "USDC"],
    ["More than 650,000 ex-offenders are released from prison each year in the U.S.", "USDC"],
    ["Approximately two-thirds of those released are likely to be rearrested within three years.", "USDC"],
    ["Of the more than 50,000 people released from federal prisons in 2010, 33% found no employment at all over the next four years.", "Prison Policy Initiative"],
    ["On average, formerly incarcerated individuals held 3.4 different jobs within four years post-release, indicating a lack of job security and upward mobility.", "Prison Policy Initiative"],
    ["The overall employment rate for ex-offenders over four years hovered between 34.9% and 37.9%, meaning about two-thirds were jobless at any given time.", "Prison Policy Initiative"],
    ["In the first few months post-release, formerly incarcerated individuals earned just 53% of the median U.S. worker's wage. After four years, they earned less than 84 cents for every dollar of the median wage.", "Prison Policy Initiative"],
    ["The average working person is employed 78% of the time, compared to just 58% of the time for formerly incarcerated individuals.", "Prison Policy Initiative"],
    ["For many, life after prison is a constant battle for survival, so it’s no wonder the national recidivism rate in the United States is over 40%", "Community Change"]
]

function factsFunction(i) {
    const li = document.createElement("li");
    let url = "";

    if (facts[i][1] == "USDC") {
        url = "https://www.justice.gov/archive/fbci/progmenu_reentry.html#:~:text=Over%2010%2C000%20ex-prisoners%20are,within%20three%20years%20of%20release."
    }
    if (facts[i][1] == "Prison Policy Initiative") {
        url = "https://www.prisonpolicy.org/blog/2022/02/08/employment/"
    }
    if (facts[i][1] == "Community Change") {
        url = "https://communitychange.org/changewire/life_long_stigma_ex_prisoner/"
    }

    li.innerHTML = facts[i][0] + " Per " + facts[i][1];

    li.addEventListener("click", () => {
        location.replace(url);
    })

    return li
}

export { facts, factsFunction }