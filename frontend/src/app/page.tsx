"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/utils";
import axiosInstance from "@/utils/axios";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const [healthyString, setHealthyString] = useState("");
    const { user } = useAppSelector((state) => state.session);

    const onClick = async () => {
        console.log("onClick");
        setHealthyString("");
        const response = await axiosInstance.get("/healthCheck");
        setHealthyString(response.data.message);
    };

    return (
        <div className="flex flex-col">
            Hello
            <Button onClick={onClick} text="test" />
            {healthyString}
            {user?.username && <p>Logged in as: {user.username}</p>}
            <p>{user?._id}</p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio autem atque est, illo
                assumenda aut architecto facilis tempora nihil quod eos dicta rerum, vitae nesciunt
                consectetur totam dolor veritatis laboriosam sequi repellendus? Error qui sapiente
                perspiciatis ipsa iusto minima magni, deserunt possimus accusamus officia eaque
                nesciunt? Odio aliquid dolorum voluptates sapiente necessitatibus eum dolor
                exercitationem adipisci incidunt? Iure eos cupiditate maxime veritatis officia quos
                impedit, quaerat blanditiis ex. Deleniti, voluptatem. A aut cupiditate aspernatur!
                Quidem minima cupiditate ut doloremque laboriosam autem quam facere tempora ducimus.
                Dicta nesciunt magni doloremque quidem temporibus, provident voluptatibus aut
                quaerat debitis, cupiditate quia eaque minus possimus nostrum! Ex enim ipsam fuga
                iure temporibus dolores optio pariatur, beatae labore distinctio consequuntur
                debitis. Necessitatibus, officia consectetur. Ea inventore eum maxime tempore
                assumenda est cum voluptate quibusdam perferendis! Ex, veniam minima quae sint
                maiores necessitatibus dolore porro iste laborum perspiciatis doloremque rerum
                cupiditate! Recusandae perspiciatis dolor eaque maxime necessitatibus. Natus autem
                labore obcaecati, inventore tempora, deleniti expedita cupiditate eveniet at commodi
                voluptatum, non quam consequatur fugit? Qui, omnis laboriosam. Quis iure dolor
                officia ipsum? Totam ab, nesciunt, aperiam expedita fuga sapiente nobis repellendus
                delectus sit harum vitae neque id, praesentium exercitationem in. Quam labore
                explicabo soluta, consequuntur exercitationem saepe itaque magni est cumque
                laboriosam fuga aperiam! Possimus, nemo, nesciunt, laborum voluptatum excepturi
                provident distinctio ipsum natus quasi sapiente dicta commodi atque consequatur
                aperiam. Nemo, possimus assumenda. Assumenda cumque et delectus illum nisi suscipit
                modi error earum iusto exercitationem dicta minima tempora, quaerat facilis esse.
                Voluptate harum dolorum ullam maxime velit laudantium dolorem molestias quibusdam
                blanditiis. Aut pariatur, nulla voluptatibus illum quam maxime asperiores voluptates
                est! Explicabo quasi voluptates, asperiores sed at eum ipsum nihil laudantium, modi,
                quidem assumenda qui cumque! Repellendus dolor labore minima eum temporibus,
                delectus velit accusamus harum debitis, quidem sint laboriosam eligendi dicta et
                voluptates tempora asperiores at nisi animi magnam consectetur. Voluptatem
                asperiores facere fugiat temporibus possimus nobis molestias pariatur, harum dolores
                necessitatibus, ut ex minima ab at omnis culpa modi quae voluptatum fuga doloribus!
                Sapiente nesciunt beatae autem saepe dolorum tenetur voluptate ut aliquid labore
                vitae fugit illum quia cupiditate est maxime, nam corporis atque excepturi ad. Eius
                dicta dolorum, quam laboriosam voluptas deleniti ad necessitatibus perferendis
                commodi aliquid adipisci molestiae laudantium a veniam quod natus. Quo, asperiores!
                Quaerat consectetur quod nostrum voluptatem culpa sint necessitatibus, fugiat unde
                autem quos ipsam amet natus eos repellendus dignissimos quae atque. Obcaecati
                perspiciatis officia explicabo delectus iusto dolor voluptates, corrupti quo
                distinctio esse odio voluptatibus dolore, praesentium ipsam fuga aliquid vero eius.
                Consectetur, impedit explicabo quos amet, ullam libero voluptate officia delectus
                blanditiis adipisci recusandae accusantium iure doloremque maxime placeat quaerat
                quod odit necessitatibus expedita ratione. Saepe atque quaerat explicabo minus nemo
                maxime dolorum vero ullam necessitatibus. Earum numquam repellendus nesciunt dolore
                ducimus aperiam itaque atque rem autem expedita nihil praesentium alias hic delectus
                dicta blanditiis perferendis placeat laborum repudiandae quae, voluptatum eveniet,
                ipsum corrupti. Quos consequuntur libero, sequi quod dolore tempora perspiciatis
                doloremque, mollitia minus eum molestias dolor minima incidunt corporis officiis
                placeat omnis temporibus repellat! Officia alias maiores magni ratione
                necessitatibus dolor id quae dolores ducimus rem doloremque est nihil officiis
                quibusdam laboriosam deserunt, iusto asperiores nulla modi eaque! Reiciendis, quae
                nobis consequuntur repudiandae est, tempora labore dolore omnis dolorem perspiciatis
                molestiae dignissimos. Consequatur expedita possimus blanditiis iure animi corporis
                doloremque odit ad est, reprehenderit beatae laborum impedit libero provident
                tempore eos harum excepturi ipsam quidem incidunt explicabo qui dolorum deleniti
                dignissimos? Incidunt accusantium quasi architecto aspernatur quos dolor excepturi
                fugit sint, mollitia voluptas a voluptatibus perspiciatis veniam quam? Iusto,
                corporis dolorem deserunt repudiandae neque consequuntur. Ut aut velit dolorum ad
                sit, debitis quam consectetur. Expedita deserunt saepe facere animi mollitia, et
                voluptatibus voluptate est itaque asperiores consectetur maxime nesciunt
                perspiciatis repellat quo dolore doloribus! Sint, vero! Nemo tenetur porro
                consequatur assumenda, itaque, dolores ad voluptas delectus aliquid iusto explicabo
                aliquam libero beatae, neque cum ut ipsum nostrum. Ex, iusto, consequuntur ea, quis
                ipsam mollitia vel labore iure quasi quas est unde nihil perferendis deserunt
                quisquam. Quis vero veniam, possimus quibusdam deleniti numquam a, id unde ea
                temporibus nobis accusamus quaerat. Eligendi non ullam fugit in beatae, perspiciatis
                iure fugiat nulla cum voluptatum atque praesentium voluptatem suscipit voluptate
                optio. Eos magni aliquam doloremque voluptatum provident nesciunt architecto
                exercitationem deserunt molestias maxime vel nobis, ab, enim qui soluta quos sed
                quaerat dolore praesentium blanditiis temporibus! Eos accusamus itaque dolores
                beatae quos quas, rem alias inventore, esse eveniet, id fuga nihil omnis aliquid
                nisi dicta! Quod, omnis voluptatibus explicabo quo possimus voluptatum, nobis
                facilis natus non magnam itaque, eius provident doloremque. Ab, in natus? Quae
                provident debitis eius pariatur repellat iusto illum explicabo, vitae veniam
                voluptate eum dolorum doloremque dignissimos sapiente. Atque laborum debitis nisi
                consectetur suscipit officiis eaque cumque, quidem ratione voluptates quaerat
                deserunt voluptate, molestias aspernatur in dicta a! Et quas dolor ipsum sunt quia
                officia, deleniti rerum, enim pariatur explicabo sit suscipit at! Nobis provident
                ipsam debitis enim aperiam dolores, quas facilis repellendus amet atque obcaecati
                odio rem consequuntur hic non ex sequi, placeat facere. Sit provident numquam aut
                necessitatibus sequi soluta? Animi ut fugiat molestiae? Nesciunt consectetur
                temporibus corrupti doloribus, quas velit repellat repudiandae enim aut natus in non
                alias consequuntur blanditiis rem dolore? Modi at quo rem. Neque et molestiae
                necessitatibus doloremque omnis iusto quisquam, quos odio nam minus impedit
                consequuntur veritatis a laudantium repudiandae dolorum reiciendis voluptatibus est
                optio illo voluptas ratione officiis, iste maiores. Ut, accusantium doloribus
                aperiam in laborum totam officia at placeat vel aspernatur quas ratione, qui velit
                quo beatae. Officia inventore ipsam ullam doloribus nisi ad fuga a tempore, suscipit
                incidunt odio. Illum eveniet debitis dicta possimus, nulla esse cum pariatur ad.
                Facilis reiciendis illo voluptates similique doloremque ipsum maxime ratione
                voluptatum dicta vel sequi fugit incidunt nihil fuga delectus distinctio quod, harum
                optio deleniti. Error quis odit alias obcaecati labore? Ut vitae obcaecati sequi
                fugiat sunt qui odit laborum earum, exercitationem provident deleniti inventore
                repudiandae necessitatibus magni recusandae excepturi accusamus alias? Totam eveniet
                molestiae fuga veritatis ad ab, illo dolor animi voluptas quia porro aliquam.
            </p>
        </div>
    );
}
