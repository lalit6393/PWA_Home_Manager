import React from "react";
// import '@patternfly/react-core/dist/styles/base.css';
import { ChartPie, ChartThemeColor } from "@patternfly/react-charts";
import { useUserAuth } from "../../context/UseUserAuth";
import './style.css';

const Graph = () => {
  const { gas, water } = useUserAuth();

  return (
    <div>
      <ChartPie
        ariaDesc="Graph Representation"
        ariaTitle="Graph Representation"
        constrainToVisibleArea
        data={[
          { x: "Gas", y: gas?.length || 0 },
          { x: "Water", y: water?.length || 0 },
        ]}
        height={275}
        labels={({ datum }) => `${datum.x}: ${datum.y}`}
        legendData={[
          { name: `Gas: ${gas?.length || 0}` },
          { name: `Water: ${water?.length || 0}` },
        ]}
        legendPosition="bottom"
        name="chart3"
        padding={{
          bottom: 65,
          left: 20,
          right: 20,
          top: 20,
        }}
        themeColor={ChartThemeColor.orange}
        width={300}
      />
    </div>
  );
};

export default Graph;
