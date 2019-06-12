package com.bonc;

import java.math.BigDecimal;
import java.text.DecimalFormat;
 
public class PointUtil {
 private final static double EARTHRADIUS = 6370996.81;
 private final static double[] MCBAND = { 12890594.86, 8362377.87, 5591021, 3481989.83,
                                          1678043.12, 0 };
 private final static int[] LLBAND = { 75, 60, 45, 30, 15, 0 };
 private final static double[][] MC2LL = {
         { 1.410526172116255e-8, 0.00000898305509648872,
 -1.9939833816331, 200.9824383106796,
 -187.2403703815547, 91.6087516669843,
 -23.38765649603339, 2.57121317296198,
 -0.03801003308653, 17337981.2 },
         { -7.435856389565537e-9, 0.000008983055097726239,
 -0.78625201886289, 96.32687599759846,
 -1.85204757529826, -59.36935905485877,
 47.40033549296737, -16.50741931063887,
 2.28786674699375, 10260144.86 },
         { -3.030883460898826e-8, 0.00000898305509983578,
 0.30071316287616, 59.74293618442277,
 7.357984074871, -25.38371002664745,
 13.45380521110908, -3.29883767235584,
 0.32710905363475, 6856817.37 },
         { -1.981981304930552e-8, 0.000008983055099779535,
 0.03278182852591, 40.31678527705744,
 0.65659298677277, -4.44255534477492,
 0.85341911805263, 0.12923347998204,
 -0.04625736007561, 4482777.06 },
         { 3.09191371068437e-9, 0.000008983055096812155,
 0.00006995724062, 23.10934304144901,
 -0.00023663490511, -0.6321817810242,
 -0.00663494467273, 0.03430082397953,
 -0.00466043876332, 2555164.4 },
         { 2.890871144776878e-9, 0.000008983055095805407,
 -3.068298e-8, 7.47137025468032,
 -0.00000353937994, -0.02145144861037,
 -0.00001234426596, 0.00010322952773,
 -0.00000323890364, 826088.5 } };
  
//point[0] :lng ,point[1] lat 
public static double[]  convertMC2LL(double[] point) 
{   double[] cF=null;
		DecimalFormat df = new DecimalFormat("#.000000");  
	   double[] cD= {Math.abs(point[0]),Math.abs(point[1])};
	  
	   for(int cE=0;cE<PointUtil.MCBAND.length;cE++)
	    {if(cD[1]>=PointUtil.MCBAND[cE])
	    	{
	    	cF=PointUtil.MC2LL[cE];
	    	
	    	break;
	    	}
	    }
	   double[] T=convertor(point,cF);
  return new double[] {Double.valueOf(df.format(T[0])),Double.valueOf(df.format(T[1]))};
}
 

//point[0] :lng ,point[1] lat 
private  static double[] convertor (double[] point, double[] ll2mc) {
    
    // 经度的转换比较简单，一个简单的线性转换就可以了。
    // 0、1的数量级别是这样的-0.0015702102444, 111320.7020616939
    double x = ll2mc[0] + ll2mc[1] * Math.abs(point[0]);
    // 先计算一个线性关系，其中9的数量级是这样的：67.5，a的估值大约是一个个位数
    double a = Math.abs(point[1]) / ll2mc[9];
    // 维度的转换相对比较复杂，y=b+ca+da^2+ea^3+fa^4+ga^5+ha^6
    // 其中，a是维度的线性转换，而最终值则是一个六次方的多项式，2、3、4、5、6、7、8的数值大约是这样的：
    // 278.2353980772752, 2485758.690035394,
    // 6070.750963243378, 54821.18345352118,
    // 9540.606633304236, -2710.55326746645,
    // 1405.483844121726,
    // 这意味着维度会变成一个很大的数，大到多少很难说
    double y = ll2mc[2] + ll2mc[3] * a + ll2mc[4] * a * a + ll2mc[5] * a
    * a * a + ll2mc[6] * a * a * a * a + ll2mc[7] * a
    * a * a * a * a + ll2mc[8] * a * a * a * a
    * a * a;
    // 整个计算是基于绝对值的，符号位最后补回去就行了
    x *= (point[0] < 0 ? -1 : 1);
    y *= (point[1] < 0 ? -1 : 1);
    // 产生一个新的点坐标。果然不一样了啊
    return  new double[]{x,y};
}
 
 public static void main(String[] args) {
	System.out.println(PointUtil.convertMC2LL(new double[] {12960208.44,4832027.92})[0] ); 
	System.out.println(PointUtil.convertMC2LL(new double[] {12960208.44,4832027.92})[1] ); 
}
}
